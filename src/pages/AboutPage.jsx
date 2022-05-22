import Card from "../components/shared/Card"
import {Link} from 'react-router-dom';

function AboutPage() {
  return (
   <Card>
     <h1>Aboot this Project</h1>
     <p>This is a React app module which is created to provide the feedback for a product or service</p>
     <p>Version: 1.0.0</p>
     <p>
     <Link to={{
            pathname:'/'
        }}>
       Back to Home 
     </Link>
      
     </p>
   </Card>
  )
}

export default AboutPage
