import { FaQuestion} from 'react-icons/fa';
import {Link, useParams} from 'react-router-dom';

function AboutIconLink() {
    // const params = useParams();
    // console.log(params);
  return (
    <div className='about-link'>
        <Link to={{
            pathname:'/about',
            search: '?sort=name',
            hash:'#hello'
        }}>
            <FaQuestion size={30} />
        </Link>
    </div>
  )
}

export default AboutIconLink
