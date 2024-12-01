import Loader from "@/components/Global/Loader";
import toast from "react-hot-toast";

const notify = {
  success: (message: string) => {
    return toast.success(message);
  },

  error: (message: string) => {
    toast.error(message);
  },

  loading: (message: string) => {
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "scale-100  opacity-100" : "scale-0 opacity-0"
          } max-w-md w-fit duration-500 gap-5  bg-background-focused my-container shadow-lg items-center p-2 pr-3 flex`}
        >
          {t.visible && <Loader />}

          {t.visible && (
            <div
              style={{
                marginLeft: 10,
              }}
              className=""
            >
              {message}
            </div>
          )}
        </div>
      ),
      {
        duration: 10000,
      }
    );
  },
};

export default notify;
