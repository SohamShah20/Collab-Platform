import { Card, CardBody } from 'reactstrap'
import { useAuth } from './Authprovider';

const Navbar = () => {
    const {user:loggedInUser, logout} = useAuth();
  return (
    <div>
        <Card>
            <CardBody className="bg-gray-200 bg-opacity-100 flex justify-between items-center p-4 ">
                <div>
                    <h1 className="font-bold text-3xl text-blue-900">
                        Real-time Collaboration App
                    </h1>
                </div>
                {
                    loggedInUser && (
                        <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                            Logout
                        </button>
                    )
                }
            </CardBody>
        </Card>
    </div>
  )
}

export default Navbar