function Avatar(props){
  return (
    <img src={props.src} alt={props.alt} width={props.size} height={props.size} style={{
      borderRadius: "50px",
    }}/>
  )
}

export default Avatar;