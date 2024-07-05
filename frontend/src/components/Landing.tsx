
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <div>
        <h1>Hello</h1>
        <Link to={"/admin"}>Create Quiz</Link>
        <Link to={"/user"}>Join Quiz</Link>
    </div>
  )
}

export default Landing