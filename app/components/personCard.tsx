type userCardProps = {
  name: string;
  nickname: string;
  phonenumber: string;
  image: string;
};

export default function UserCard({ name, nickname, phonenumber, image }: userCardProps) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      width: "200px",
      textAlign: "center"
    }}>
   <img src={image} style={{ width: "100%", height: "auto", borderRadius: "50%" }} />
    <h2>Name: {name}</h2>
    <p>Nickname: {nickname}</p>
    <p>Phone: {phonenumber}</p>
  </div>
  );
}
