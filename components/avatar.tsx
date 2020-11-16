type Props = {
  name: string
  picture: string
  email: string
}

const Avatar = ({ name, picture,email }: Props) => {
  return (
    <div className="flex items-center w-3/4">
      <img src={picture} className="w-12 h-12 rounded-full mr-4 object-cover" alt={name} />
      <div>
      <div className="text-xl">{name}</div>
      <p>{email || '-'}</p>
      </div>
    </div>
  )
}

export default Avatar
