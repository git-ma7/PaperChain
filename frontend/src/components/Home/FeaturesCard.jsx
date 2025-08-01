function FeaturesCard(props) {
  return (
    <div className="flex flex-col gap-2 justify-center p-5 bg-white/40 backdrop-blur-xl shadow-lg rounded-md border border-black/10">
        {props.logo}
        <h3 className="text-xl font-semibold">{props.title}</h3>
        <p>{props.description}</p>
    </div>
  )
}

export default FeaturesCard