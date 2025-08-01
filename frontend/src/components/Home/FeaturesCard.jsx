function FeaturesCard(props) {
  return (
    <div className="flex flex-col gap-2 justify-center p-6 bg-white shadow-lg rounded-lg border border-black/10">
        {props.logo}
        <h3 className="text-xl ">{props.title}</h3>
        <p>{props.description}</p>
    </div>
  )
}

export default FeaturesCard