import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useCookie from '../../../../hooks/useCookie';
import { useSearchParams } from 'next/router';

export default function newProject() {
    const router = useRouter();
    const { workspaceName } = router.query;
    const [file, setFile] = useState(null);
    const username = useCookie("username");


    useEffect(() => {
        // Redirect to the upload page
        router.push(`/workspace/${workspaceName}/automl/newproject/upload`);
    }, [router]);

    return null;  // Render nothing while redirecting
}