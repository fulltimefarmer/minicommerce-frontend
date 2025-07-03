// src/components/UserInfo.tsx
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  address: '123 Main St, Anytown, USA',
};

export default function UserInfo() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Info</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
    </div>
  );
}
