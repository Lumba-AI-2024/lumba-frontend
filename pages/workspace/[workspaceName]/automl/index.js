import Seo from "../../../../src/components/Seo";
import * as React from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../../../../src/components/Breadcrumb";
import Button from "../../../../src/components/Button/Button";
import Plus from "../../../../src/components/Icon/Plus";
const AutoML = () => {
    const router = useRouter();
    const { workspaceName } = router.query;
    // route to new-project.js
    const handleNewProject = () => {
        router.push(`/workspace/${workspaceName}/automl/new-project`);
    };
    
    return (
        <>
        <Seo title={`${workspaceName} - AutoML`}  />
        <Breadcrumb links={[{ label: workspaceName }, { label: "AutoML", href: router.asPath }]} active={"AutoML"} />
        <div className="flex flex-col gap-6 my-6">
          <h1>Automated ML</h1>
        </div>
        <Button onClick={()=>{
            handleNewProject();
        }}>
          <div className="flex font-semibold items-center gap-1">
                <Plus />
                New Automated ML Job
          </div>
        </Button>


        </>
    );
}

export default AutoML;

