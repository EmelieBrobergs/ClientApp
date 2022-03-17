import { useAppSelector } from "../../app/hooks";

export function User(){
    const user = useAppSelector(state => state.user);
    
    return (
        <div>
            <h4>{user.currentUser?.company}</h4>
            <p>{user.currentUser?.firstName} {user.currentUser?.lastName}</p>
        </div>
    )
}