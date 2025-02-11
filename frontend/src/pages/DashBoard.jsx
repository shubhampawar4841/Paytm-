import {Appbar} from '../components/Appbar';
import {Balance} from '../components/Balance';
import {Users} from '../components/Users';

export const DashBoard = () => {
    return <>
        <Appbar></Appbar>
        <div className="m-8">
            <Balance value={10000}></Balance>
            <Users></Users>
        </div>
    </>
}

