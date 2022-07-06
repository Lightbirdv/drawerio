import { useRouter } from 'next/router';
import ResetPasswordComponent from "../../../components/ResetPasswordComponent"

export default function ResetPasswordHash(){
    const router = useRouter();
    const { hash } = router.query;
    console.log(hash)
    return <ResetPasswordComponent hash={hash}/>
}