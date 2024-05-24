import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/router';
import useCookie from '../../../../src/hooks/useCookie';
export default function newProject() {
    const router = useRouter();
    const { workspaceName } = router.query;
    const [file, setFile] = useState(null);
    const username = useCookie("username");


    useEffect(() => {
        // Redirect to the upload page
        router.push(`/workspace/${workspaceName}/automl/newproject/upload?type=${type}`);
    }, [router]);

    return null;  // Render nothing while redirecting
}