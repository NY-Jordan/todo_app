import Image from "next/image";
import localFont from "next/font/local";
import Layout from "@/presentation/layout/Layout";
import { useResponsive } from "@/Infrastructure/Hooks/useResponsive";
import Card from "@/presentation/components/Card/Card";
import ProjectsTable from "@/presentation/components/ProjectsTable";

export default function index() {
  const {isTabletOrMobile, isSM} = useResponsive();

  return (
  <Layout pageTitle="Dashboard">
    
    <div>
      <div className='w-full flex space-x-4'>
          <div className='w-2/3'>
            scsc
          </div>
          <div className='w-1/3'>
              <div className={'mt-2 ' + (isSM ? "grid mb-6 grid-cols-2 gap-6 " : "grid mb-6 grid-cols-2 gap-6 ")} style={{ width : '100%',  }}>
                <Card title='Projects'   percent='04' />
                <Card  title='Tasks'   percent='40'/>
                <Card title='links'   percent='60' />
              </div>
          </div>
        </div>
    </div>
    <ProjectsTable />
    
  </Layout>
  );
}


