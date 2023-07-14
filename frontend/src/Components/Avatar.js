function Avatar(props){
  return (
    <img src={"/images/avatars/" + (Math.floor(Math.random() * 10) + 1) + ".jpeg"} alt={props.alt} width={props.size} height={props.size} style={{
      borderRadius: "50px",
    }}/>
  )
}

export default Avatar;