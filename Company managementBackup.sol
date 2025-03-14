// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CompanyManagement {
    address public manager;
    uint256 public tokenRewardPerAttendance = 10; // Tokens for signing attendance
    uint256 public taskCount;
    // uint256 public signalCount;
    address[] public registeredStaffAddress;

    struct Staff {
        string name;
        uint256 tokensEarned;
        uint256[] taskIds;
        uint256 registeredAt; // Timestamp when staff is registered
        address staffAddress;
        string gender;
        bool isRegistered;
    }

    struct Task {
        string taskName;
        string status; // Pending(manager), Ongoing(staff acceptance), review(staff's clicking completed) ,rejected(manager) Completed(manager)
        uint256 tokenReward;
        uint256 createdAt; // Timestamp when task is marked as pending
        uint256 inAcceptedAt;
        uint256 reviewAt //Time staff clicked completed but the manager will set it as review after which the  manager can toggle it to rejected or completed
        uint256 rejectedAt
        uint256 completedAt; // Timestamp when task is marked as completed
        address taskAsignedTo;

    }

    // struct Signal {
    //     uint256 taskId;
    //     address staffAddress;
    //     string signalType; // Started, Completed
    // }

    mapping(address => Staff) public staffList;
    mapping(uint256 => task) public tasks;
    // mapping(uint256 => Signal[]) public taskSignals;

    event StaffRegistered(address staffAddress, string name);
    event taskAssigned(address staffAddress, uint256 taskId, string taskName);
    event TokensDistributed(address staffAddress, uint256 amount);
    // event SignalSent(uint256 signalId, uint256 taskId, address staffAddress, string signalType);
    event taskStatusUpdatedByManager(uint256 taskId, string newStatus);

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }
    
    modifier onlyManagerOrAssignedStaff(uint256 taskId) {
        require(
            msg.sender == manager || msg.sender == tasks[taskId].taskAssignedTo,
            "Only manager or assigned staff can call this function"
        );
        _;
    }

    constructor() {
        manager = msg.sender;
    }

    // Register a new staff (only manager)
    function registerStaff(address staffAddress, string memory name, string memory gender) public onlyManager {
        // require(staffList[staffAddress].tokensEarned == 0, "Staff already registered");
        require(staffList[staffAddress].registeredAt == 0, "Staff already registered");
        staffList[staffAddress] = Staff({
            name: name,
            tokensEarned: 0,
            taskIds: new uint256[](0),
            registeredAt: block.timestamp, // Set registration timestamp
            staffAddress: staffAddress,
            gender:gender,
            isRegistered: true

        });

        registeredStaffAddress.push(staffAddress);
        emit StaffRegistered(staffAddress, name);
    }

    // Assign a task to a staff (only manager)
    function assigntask(address staffAddress, string memory taskName, uint256 tokenReward) public onlyManager {
        taskCount++;
        tasks[taskCount] = task({
            taskName: taskName,
            status: "Pending",
            tokenReward: tokenReward,
            createdAt: block.timestamp, // task creation time and pending
            inAcceptedAt:0;
            reviewAt:0,
            rejectedAt:0,
            completedAt: 0 ,// task is not completed yet
            taskAsignedTo:staffAddress,
        });
        staffList[staffAddress].taskIds.push(taskCount);
        emit taskAssigned(staffAddress, taskCount, taskName);
    }

    // Staff signs attendance and earns tokens
    function signAttendance() public {
        require(bytes(staffList[msg.sender].name).length > 0, "Not a registered staff");
        staffList[msg.sender].tokensEarned += tokenRewardPerAttendance;
        emit TokensDistributed(msg.sender, tokenRewardPerAttendance);
    }

    // Staff sends a signal for a task (e.g., Started or Completed)
    // function sendSignal(uint256 taskId, string memory signalType) public {
    //     require(bytes(staffList[msg.sender].name).length > 0, "Not a registered staff");
    //     signalCount++;
    //     taskSignals[taskId].push(Signal({
    //         taskId: taskId,
    //         staffAddress: msg.sender,
    //         signalType: signalType
    //     }));
    //     emit SignalSent(signalCount, taskId, msg.sender, signalType);
    // }



    // Manager updates the status of a task (only manager)
    function updatetaskStatusByManagerOrStaff(uint256 taskId, string memory newStatus) public onlyManagerOrAssignedStaff  {
        task storage task = tasks[taskId];
        task.status = newStatus;

        // Update timestamps based on status
        if (keccak256(abi.encodePacked(newStatus)) == keccak256(abi.encodePacked("inProgress"))) {
            task.inProgress = block.timestamp;
        } else if (keccak256(abi.encodePacked(newStatus)) == keccak256(abi.encodePacked("review"))) {
            task.review = block.timestamp;
        } else if (keccak256(abi.encodePacked(newStatus)) == keccak256(abi.encodePacked("rejected"))) {
            task.rejected = block.timestamp;
        } else if (keccak256(abi.encodePacked(newStatus)) == keccak256(abi.encodePacked("Completed"))) {
            task.completedAt = block.timestamp;
        }

        emit taskStatusUpdatedByManager(taskId, newStatus);
    }

    // function updatetaskStatusByStaff (uint256 taaskid, string memory newStatus) public registeredStaff{
        
    // }

    // Distribute tokens to staff when a task is completed (only manager)
    function distributeTokensFortask(address staffAddress, uint256 taskId) public onlyManager {
        require(keccak256(abi.encodePacked(tasks[taskId].status)) == keccak256(abi.encodePacked("Completed")), "task not completed");
        staffList[staffAddress].tokensEarned += tasks[taskId].tokenReward;
        emit TokensDistributed(staffAddress, tasks[taskId].tokenReward);
    }

    // Get details of a staff member by the manager
    function getStaffDetails(address staffAddress) public view returns (Staff memory) {
        return staffList[staffAddress];
    }

    // Get details of a task
    function gettaskDetails(uint256 taskId) public view returns (task memory) {
        return tasks[taskId]; 
    }

    // Get all signals for a task
    // function getSignalsFortask(uint256 taskId) public view returns (Signal[] memory) {
    //     return taskSignals[taskId];
    // }

    function getAllRegisteredAddress() public view returns (address[] memory){
        return  registeredStaffAddress;
    }


    function userAlltasks (address userAddress, uint256 taskId) public returns (task[] memory){

        //create new array for save all the individuals tasks data
      uint256[] storage usertaskIdsList= staffList[userAddress].taskIds;
        //Get the particular user and then access the taskIds associated to the user
         task[] memory usertaskList = new task[](usertaskIdsList.length);

      for(uint256 i= 0; i< usertaskIdsList.length; i++){

        uint256  usertaskId = usertaskIdsList[i];
        task storage task = tasks[usertaskId];

        usertaskList[i]= task;
      }

      return usertaskList;

    }
}