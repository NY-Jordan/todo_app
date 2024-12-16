import Image from "next/image";
import localFont from "next/font/local";
import Layout from "@/presentation/layout/Layout";
import { useResponsive } from "@/Infrastructure/hooks/useResponsive";
import Card from "@/presentation/components/Card/Card";
import ProjectsTable from "@/presentation/components/ProjectsTable";

export default function index() {
  const {isTabletOrMobile, isSM} = useResponsive();

  return (
    <div>
      
    </div>
  );
}


