import { useRouter } from 'next/router';
import { confirmUser } from '../../../lib/confirmUser';

export default function ConfirmationHash(){
    const router = useRouter();
    const { hash } = router.query;
    if(!hash){
        return;
    }
    console.log(hash)
    confirmUser(hash);
}