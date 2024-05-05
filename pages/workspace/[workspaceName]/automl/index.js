import Seo from "../../../../src/components/Seo";
import * as React from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../../../../src/components/Breadcrumb";

const AutoML = () => {
    const router = useRouter();
    const { workspaceName } = router.query;
    
    return (
        <>
        <Seo title={`${workspaceName} - AutoML`}  />
        <Breadcrumb links={[{ label: workspaceName }, { label: "AutoML", href: router.asPath }]} active={"AutoML"} />
        <div className="flex flex-col gap-6 my-6">
          <h1>Automated ML</h1>
        </div>
        </>
    );
}

export default AutoML;