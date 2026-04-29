import Profile from "../components/Profile";
import { useUserProfileQuery } from "../hooks/api.hooks";
import { motion } from "framer-motion";
import { SpinnerLoading } from "@/components/common/spinner";

const ProfilePage = () => {
  const { data, isLoading } = useUserProfileQuery();
  const userData = data?.data;

  if (isLoading)
    return <SpinnerLoading title="loading.."  />;
  if (!data) return null;
  return (
    <>
      <main className="flex-1 overflow-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-6"
        >
          <Profile user={userData} />
        </motion.div>
      </main>
    </>
  );
};

export default ProfilePage;
