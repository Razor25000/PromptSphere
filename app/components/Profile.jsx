import PromptCard from "./PromptCard"

const Profile = ({name,description,data,handleEdit,handleDelete}) => {
  return (
    <section className="w-full">
    <h1 className="text-left head_text">
    <span className="blue_gradient">
          {name} Profil</span>
    </h1>
    <p desc text-left>{description}</p>
      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={()=>handleEdit && handleEdit(post)}
            handleDelete={()=>handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile