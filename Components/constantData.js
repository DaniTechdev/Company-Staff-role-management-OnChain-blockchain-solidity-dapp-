export const buttons = [
  { label: "Register Staff", index: 1 },
  { label: "Staff details", index: 2 },
  { label: "Assign role", index: 3 },
  { label: "Staff Roles", index: 4 },
  { label: "Roles signals", index: 5 },
  { label: "Total role token rewarded", index: 6 },
  { label: "Total Attendance token rewarded", index: 7 },
];

export const StaffData = [
  {
    name: "Alice Johnson",
    address: "0x1a2b3c4d5e6f708192a1b2c3d4e5f6a7b8c9d0e1",
    gender: "Female",
    roleCount: 3,
    registeredAt: "2022-03-15T08:00:00Z",
    totalTokenEarned: 1200,
  },
  {
    name: "Bob Smith",
    address: "0x2b3c4d5e6f708192a1b2c3d4e5f6a7b8c9d0e1f2",
    gender: "Male",
    roleCount: 5,
    registeredAt: "2021-07-22T12:30:00Z",
    totalTokenEarned: 2500,
  },
  {
    name: "Charlie Brown",
    address: "0x3c4d5e6f708192a1b2c3d4e5f6a7b8c9d0e1f2a3",
    gender: "Male",
    roleCount: 2,
    registeredAt: "2023-01-10T09:45:00Z",
    totalTokenEarned: 800,
  },
  {
    name: "Diana Prince",
    address: "0x4d5e6f708192a1b2c3d4e5f6a7b8c9d0e1f2a3b4",
    gender: "Female",
    roleCount: 4,
    registeredAt: "2020-11-05T14:20:00Z",
    totalTokenEarned: 3000,
  },
  {
    name: "Evan Davis",
    address: "0x5e6f708192a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
    gender: "Male",
    roleCount: 1,
    registeredAt: "2023-05-20T17:10:00Z",
    totalTokenEarned: 500,
  },
  {
    name: "Fiona Gallagher",
    address: "0x6f708192a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    gender: "Female",
    roleCount: 6,
    registeredAt: "2019-09-12T10:00:00Z",
    totalTokenEarned: 4500,
  },
  {
    name: "George Harris",
    address: "0x708192a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    gender: "Male",
    roleCount: 3,
    registeredAt: "2022-08-30T11:15:00Z",
    totalTokenEarned: 1800,
  },
  {
    name: "Hannah Miller",
    address: "0x8192a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    gender: "Female",
    roleCount: 2,
    registeredAt: "2021-12-25T20:00:00Z",
    totalTokenEarned: 950,
  },
  {
    name: "Ian Clark",
    address: "0x92a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9",
    gender: "Male",
    roleCount: 4,
    registeredAt: "2020-04-18T13:50:00Z",
    totalTokenEarned: 2200,
  },
  {
    name: "Jenna White",
    address: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0",
    gender: "Female",
    roleCount: 3,
    registeredAt: "2023-03-01T16:05:00Z",
    totalTokenEarned: 1500,
  },
];
export const Staff = {
  name: "Alice Johnson",
  address: "0x1a2b3c4d5e6f708192a1b2c3d4e5f6a7b8c9d0e1",
  gender: "Female",
  roleCount: 3,
  registeredAt: "2022-03-15T08:00:00Z",
  totalTokenEarned: 1200,
};

export const roleData = [
  {
    roleName: "Developer",
    status: "Pending",
    tokenReward: 500,
    createdAt: 1672531200, // 2023-01-01 00:00:00 UTC
    pendingAt: 1672534800, // 2023-01-01 01:00:00 UTC
    completedAt: 0,
  },
  {
    roleName: "Designer",
    status: "Ongoing",
    tokenReward: 300,
    createdAt: 1672617600, // 2023-01-02 00:00:00 UTC
    pendingAt: 1672621200, // 2023-01-02 01:00:00 UTC
    completedAt: 0,
  },
  {
    roleName: "Manager",
    status: "Completed",
    tokenReward: 1000,
    createdAt: 1672704000, // 2023-01-03 00:00:00 UTC
    pendingAt: 1672707600, // 2023-01-03 01:00:00 UTC
    completedAt: 1672794000, // 2023-01-04 01:00:00 UTC
  },
  {
    roleName: "Tester",
    status: "Pending",
    tokenReward: 200,
    createdAt: 1672876800, // 2023-01-05 00:00:00 UTC
    pendingAt: 1672880400, // 2023-01-05 01:00:00 UTC
    completedAt: 0,
  },
  {
    roleName: "Analyst",
    status: "Ongoing",
    tokenReward: 400,
    createdAt: 1672963200, // 2023-01-06 00:00:00 UTC
    pendingAt: 1672966800, // 2023-01-06 01:00:00 UTC
    completedAt: 0,
  },
  {
    roleName: "Marketer",
    status: "Completed",
    tokenReward: 700,
    createdAt: 1673049600, // 2023-01-07 00:00:00 UTC
    pendingAt: 1673053200, // 2023-01-07 01:00:00 UTC
    completedAt: 1673139600, // 2023-01-08 01:00:00 UTC
  },
  {
    roleName: "Support",
    status: "Pending",
    tokenReward: 150,
    createdAt: 1673222400, // 2023-01-09 00:00:00 UTC
    pendingAt: 1673226000, // 2023-01-09 01:00:00 UTC
    completedAt: 0,
  },
  {
    roleName: "Consultant",
    status: "Ongoing",
    tokenReward: 600,
    createdAt: 1673308800, // 2023-01-10 00:00:00 UTC
    pendingAt: 1673312400, // 2023-01-10 01:00:00 UTC
    completedAt: 0,
  },
  {
    roleName: "Architect",
    status: "Completed",
    tokenReward: 1200,
    createdAt: 1673395200, // 2023-01-11 00:00:00 UTC
    pendingAt: 1673398800, // 2023-01-11 01:00:00 UTC
    completedAt: 1673485200, // 2023-01-12 01:00:00 UTC
  },
  {
    roleName: "Intern",
    status: "Pending",
    tokenReward: 100,
    createdAt: 1673571600, // 2023-01-13 01:00:00 UTC
    pendingAt: 1673575200, // 2023-01-13 02:00:00 UTC
    completedAt: 0,
  },
];
