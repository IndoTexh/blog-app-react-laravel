import { useForm, usePage } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";

const Notice = () => {
    const route = useRoute();
    const message = usePage().props;
    const { post } = useForm();

    function submit(e) {
        e.preventDefault();
        post(route("verification.send"));
    }
    return (
        <>
            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-md p-5 mt-5">
                <p className="text-sm text-orange-500 font-semibold mb-2"></p>
                <div className="space-y-4">
                    <p className="text-orange-500 text-sm font-semibold">
                        Thank you🙏 Before getting start could you please verify
                        your email address by clicking on the link we just
                        emailed you? If you didn't receive the email we gladly
                        sent you another😊
                    </p>
                    <form onSubmit={submit}>
                        {message.email_message && (
                            <p className="text-orange-500 text-sm mt-2 mb-2 font-semibold">
                                {message.email_message}
                            </p>
                        )}
                        <button className="bg-orange-500 px-4 py-1 rounded-md text-white text-sm font-semibold">
                            Resend
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Notice;
