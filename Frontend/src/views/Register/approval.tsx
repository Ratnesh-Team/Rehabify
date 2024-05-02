import { Alert, Button } from '@/components/ui';
import { Link } from 'react-router-dom';

function Approval() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Alert showIcon className="pb-5">
                Data Verification in progress
            </Alert>
            <h1 className="pt-5 pb-10 dark:text-red text-center">
                We are Verifying Your Nasha Mukti Kendra Detail
            </h1>
            <h3 className="mb-5 text-center">Usually it takes 2-5 Days</h3>
            <br /><br />
            <div className="text-center">
                <p className="mb-3">While we are verifying your data, have a look at our services.</p>
            </div>
            <div className="text-center">
                <Link to="/database">
                    <Button shape="circle" variant="solid">
                        Go to Home Page
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Approval;
