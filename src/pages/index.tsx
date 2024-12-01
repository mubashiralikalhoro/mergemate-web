export default function Home() {
  return <div />;
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/discover",
      permanent: false,
    },
  };
};
