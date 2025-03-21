// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./CompanyToken.sol"; // Import the token contract

contract CompanyManagement {
    address public manager;
    uint256 public tokenRewardPerAttendance; // Tokens for signing attendance normal
    uint256 public taskCount;
    address[] public registeredStaffAddress;
    CompanyToken public token; // Reference to the token contract
    uint256 public tokenDecimals;

    struct Staff {
        string name;
        uint256 tokensEarned; // Tokens earned but not yet paid out
        uint256[] taskIds;
        uint256 registeredAt;
        address staffAddress;
        string gender;
        bool isRegistered;
        uint256 lastCheckin;
    }

    struct Task {
        string taskName;
        string status; 
        uint256 tokenReward; // Tokens rewarded for this task (in token decimals)
        uint256 createdAt;
        uint256 inAcceptedAt;
        uint256 reviewAt;
        uint256 rejectedAt;
        uint256 completedAt;
        address taskAssignedTo;
        string taskAssignedToName;
    }

    mapping(address => Staff) public staffList;
    mapping(uint256 => Task) public tasks;

    event StaffRegistered(address staffAddress, string name);
    event TaskAssigned(address staffAddress, uint256 taskId, string taskName);
    event TokensDistributed(address staffAddress, uint256 amount);
    event TaskStatusUpdatedByManagerOrStaff(uint256 taskId, string newStatus);
    event Payout(address staffAddress, uint256 amount);

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    modifier onlyManagerOrAssignedStaff(uint256 taskId) {
        require(
            msg.sender == manager || msg.sender == tasks[taskId].taskAssignedTo,
            "Only manager or assigned staff"
        );
        _;
    }

    // Initialize with the token contract address
    constructor(address _tokenAddress) {
        manager = msg.sender;
        token = CompanyToken(_tokenAddress);
        // tokenRewardPerAttendance = 10 * 10 ** token.decimals(); // e.g., 10 tokens
        tokenDecimals = token.decimals();
    }

    // Register a new staff (only manager)
    function registerStaff(address staffAddress, string memory name, string memory gender) public onlyManager {
        require(staffList[staffAddress].registeredAt == 0, "Staff already registered");
        staffList[staffAddress] = Staff({
            name: name,
            tokensEarned: 0,
            taskIds: new uint256[](0),
            registeredAt: block.timestamp,
            staffAddress: staffAddress,
            gender: gender,
            isRegistered: true,
            lastCheckin:0
        });
        registeredStaffAddress.push(staffAddress);
        emit StaffRegistered(staffAddress, name);
    }

    function setTokenRewardPerAttendance(uint256 _tokenReward) public onlyManager {
    tokenRewardPerAttendance = _tokenReward;
    }


    // Assign a task and mint tokens to this contract (only manager)
    function assignTask(address staffAddress, string memory taskName, uint256 tokenReward) public onlyManager {

         uint256 tokenRewardIngwei = tokenReward * (10 ** tokenDecimals);
        taskCount++;
        
        tasks[taskCount] = Task({
            taskName: taskName,
            status: "Pending",
            tokenReward: tokenReward,
            createdAt: block.timestamp,
            inAcceptedAt: 0,
            reviewAt: 0,
            rejectedAt: 0,
            completedAt: 0,
            taskAssignedTo: staffAddress,
            taskAssignedToName:staffList[staffAddress].name
        });
        staffList[staffAddress].taskIds.push(taskCount);

        // Mint tokens to this contract
        token.mint(address(this), tokenRewardIngwei);
        emit TaskAssigned(staffAddress, taskCount, taskName);
    }

    // Staff signs attendance and earns tokens
    function signAttendance() public {
        require(staffList[msg.sender].isRegistered, "Not a registered staff");
        if(staffList[msg.sender].lastCheckin == 0){
            staffList[msg.sender].lastCheckin = block.timestamp;
        }else{
            // require(block.timestamp - staffList[msg.sender].lastCheckin >= 1 days, "You can only checkin once a day");
            require(block.timestamp >= staffList[msg.sender].lastCheckin + 24 hours,"You can only checkin once a day");
            staffList[msg.sender].lastCheckin = block.timestamp;
        }

        staffList[msg.sender].tokensEarned += tokenRewardPerAttendance;

        uint256 tokenRewardPerAttendanceInBasedUnit = tokenRewardPerAttendance * (10 ** tokenDecimals);

        // Mint tokens to this contract
        token.mint(address(this), tokenRewardPerAttendanceInBasedUnit);
        emit TokensDistributed(msg.sender, tokenRewardPerAttendance);
    }

    // Update task status and handle token rewards (manager or assigned staff)
    function updateTaskStatusByManagerOrStaff(uint256 taskId, string memory newStatus) public onlyManagerOrAssignedStaff(taskId) {
        Task storage task = tasks[taskId];
        task.status = newStatus;

        // If task is marked as "Completed", credit tokens to staff

        if (keccak256(abi.encodePacked(newStatus)) == keccak256(abi.encodePacked("inProgress"))) {
            task.inAcceptedAt = block.timestamp;
        } else if (keccak256(abi.encodePacked(newStatus)) == keccak256(abi.encodePacked("review"))) {
            task.reviewAt = block.timestamp;
        } else if (keccak256(abi.encodePacked(newStatus)) == keccak256(abi.encodePacked("rejected"))) {
            task.rejectedAt = block.timestamp;
        } else if (keccak256(abi.encodePacked(newStatus)) == keccak256(abi.encodePacked("Completed"))) {
            staffList[task.taskAssignedTo].tokensEarned += task.tokenReward;
            task.completedAt = block.timestamp;
        }


        emit TaskStatusUpdatedByManagerOrStaff(taskId, newStatus);
    }

    // Staff requests payout of earned tokens
    function requestPayout() public {
        require(staffList[msg.sender].isRegistered, "Not registered");
        uint256 amount = staffList[msg.sender].tokensEarned;
        require(amount > 0, "No tokens to payout");

        uint amountInBasegwei = amount * (10 ** tokenDecimals);

        // Reset earned tokens
        staffList[msg.sender].tokensEarned = 0;

        // Transfer tokens from this contract to the staff
        token.transfer(msg.sender, amountInBasegwei);
        emit Payout(msg.sender, amount);
    }




    
    // Get details of a staff member by the manager
    function getStaffDetails(address staffAddress) public view returns (Staff memory) {
        require(staffList[staffAddress].isRegistered,"Address is not registered");
        return staffList[staffAddress];
    }

    // Get details of a task
    function gettaskDetails(uint256 taskId) public view returns (Task memory) {
        return tasks[taskId]; 
    }

    // Get all signals for a task
    // function getSignalsFortask(uint256 taskId) public view returns (Signal[] memory) {
    //     return taskSignals[taskId];
    // }

    function getAllRegisteredAddress() public view returns (address[] memory){
        return  registeredStaffAddress;
    }

    function setAttendanceReward(uint256 _tokenRewardPerAttendance) public onlyManager {
        tokenRewardPerAttendance = _tokenRewardPerAttendance;
    }
}