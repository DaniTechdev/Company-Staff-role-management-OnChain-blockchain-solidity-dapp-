// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CompanyManagement {
    address public manager;
    uint256 public tokenRewardPerAttendance = 10; // Tokens for signing attendance
    uint256 public roleCount;
    uint256 public signalCount;
    address[] public registeredStaffAddress;

    struct Staff {
        string name;
        uint256 tokensEarned;
        uint256[] roleIds;
        uint256 registeredAt; // Timestamp when staff is registered
        address staffAddress;
        string gender;
    }

    struct Role {
        string roleName;
        string status; // Pending, Ongoing, Completed
        uint256 tokenReward;
        uint256 createdAt; // Timestamp when role is created
        uint256 pendingAt; // Timestamp when role is marked as pending
        uint256 completedAt; // Timestamp when role is marked as completed
    }

    struct Signal {
        uint256 roleId;
        address staffAddress;
        string signalType; // Started, Completed
    }

    mapping(address => Staff) public staffList;
    mapping(uint256 => Role) public roles;
    mapping(uint256 => Signal[]) public roleSignals;

    event StaffRegistered(address staffAddress, string name);
    event RoleAssigned(address staffAddress, uint256 roleId, string roleName);
    event TokensDistributed(address staffAddress, uint256 amount);
    event SignalSent(uint256 signalId, uint256 roleId, address staffAddress, string signalType);
    event RoleStatusUpdatedByManager(uint256 roleId, string newStatus);

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can call this function");
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
            roleIds: new uint256[](0),
            registeredAt: block.timestamp, // Set registration timestamp
            staffAddress: staffAddress,
            gender:gender

        });

        registeredStaffAddress.push(staffAddress);
        emit StaffRegistered(staffAddress, name);
    }

    // Assign a role to a staff (only manager)
    function assignRole(address staffAddress, string memory roleName, uint256 tokenReward) public onlyManager {
        roleCount++;
        roles[roleCount] = Role({
            roleName: roleName,
            status: "Pending",
            tokenReward: tokenReward,
            createdAt: block.timestamp, // Role creation time
            pendingAt: block.timestamp, // Role is initially pending
            completedAt: 0 // Role is not completed yet
        });
        staffList[staffAddress].roleIds.push(roleCount);
        emit RoleAssigned(staffAddress, roleCount, roleName);
    }

    // Staff signs attendance and earns tokens
    function signAttendance() public {
        require(bytes(staffList[msg.sender].name).length > 0, "Not a registered staff");
        staffList[msg.sender].tokensEarned += tokenRewardPerAttendance;
        emit TokensDistributed(msg.sender, tokenRewardPerAttendance);
    }

    // Staff sends a signal for a role (e.g., Started or Completed)
    function sendSignal(uint256 roleId, string memory signalType) public {
        require(bytes(staffList[msg.sender].name).length > 0, "Not a registered staff");
        signalCount++;
        roleSignals[roleId].push(Signal({
            roleId: roleId,
            staffAddress: msg.sender,
            signalType: signalType
        }));
        emit SignalSent(signalCount, roleId, msg.sender, signalType);
    }



    // Manager updates the status of a role (only manager)
    function updateRoleStatusByManager(uint256 roleId, string memory newStatus) public onlyManager {
        Role storage role = roles[roleId];
        role.status = newStatus;

        // Update timestamps based on status
        if (keccak256(abi.encodePacked(newStatus)) == keccak256(abi.encodePacked("Pending"))) {
            role.pendingAt = block.timestamp;
        } else if (keccak256(abi.encodePacked(newStatus)) == keccak256(abi.encodePacked("Completed"))) {
            role.completedAt = block.timestamp;
        }

        emit RoleStatusUpdatedByManager(roleId, newStatus);
    }

    // Distribute tokens to staff when a role is completed (only manager)
    function distributeTokensForRole(address staffAddress, uint256 roleId) public onlyManager {
        require(keccak256(abi.encodePacked(roles[roleId].status)) == keccak256(abi.encodePacked("Completed")), "Role not completed");
        staffList[staffAddress].tokensEarned += roles[roleId].tokenReward;
        emit TokensDistributed(staffAddress, roles[roleId].tokenReward);
    }

    // Get details of a staff member by the manager
    function getStaffDetails(address staffAddress) public view returns (Staff memory) {
        return staffList[staffAddress];
    }

    // Get details of a role
    function getRoleDetails(uint256 roleId) public view returns (Role memory) {
        return roles[roleId];
    }

    // Get all signals for a role
    function getSignalsForRole(uint256 roleId) public view returns (Signal[] memory) {
        return roleSignals[roleId];
    }

    function getAllRegisteredAddress() public view returns (address[] memory){
        return  registeredStaffAddress;
    }


   

    function userAllRoles (address userAddress, uint256 roleId) public returns (Role[] memory){

        //create new array for save all the individuals roles data
      uint256[] storage userRoleIdsList= staffList[userAddress].roleIds;
        //Get the particular user and then access the RoleIds associated to the user
         Role[] memory userRoleList = new Role[](userRoleIdsList.length);

      for(uint256 i= 0; i< userRoleIdsList.length; i++){

        uint256  userRoleId = userRoleIdsList[i];
        Role storage role = roles[userRoleId];

        userRoleList[i]= role;
      }

      return userRoleList;

    }
}