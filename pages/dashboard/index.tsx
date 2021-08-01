import React from 'react';

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getUser`).then((response) =>
    response.json()
  );

  const { user } = response;

  if (!user) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  return { props: { user } };
}

function DashboardPage({user}: any) {
  return (
    <div>
      Welcome {user.email}
    </div>
  );
}

export default DashboardPage;
