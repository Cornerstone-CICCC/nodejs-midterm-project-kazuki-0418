import type { JSX } from "react";
import { useOutletContext } from "react-router-dom";
import { useWindowSize } from "../../hooks/windowsize";
import { ImportButton } from "../features/import/importButton";
import { DashboardSection } from "../sections/DashboardSection/DashboardSection";
import { ReportSection } from "../sections/ReportSection/ReportSection";
import { SummarySection } from "../sections/SummarySection/SummarySection";

export function Home(): JSX.Element {
  const { isNavOpen } = useOutletContext<{ isNavOpen: boolean }>();
  const { width } = useWindowSize();
  const isDesktopScreen = width > 1024;

  const shouldShowPage = () => {
    if (!isDesktopScreen && isNavOpen) {
      return false;
    }
    return true;
  };

  return (
    <main className="flex bg-[#f8f8f8] h-screen w-full">
      <div
        className={`flex-1 h-screen w-full transition-all duration-300 ${
          isNavOpen ? "lg:pl-[278px]" : "pl-0"
        }`}
      >
        {shouldShowPage() && (
          <div className="flex flex-col h-full p-4 md:p-6 gap-4 md:gap-6 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
              <ImportButton />
            </div>

            {/* モバイル画面での1列レイアウト、デスクトップでの2列レイアウト */}
            <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
              <div className="flex flex-col gap-4 md:gap-6 w-full xl:w-1/2">
                <SummarySection />
                <DashboardSection />
              </div>

              <div className="w-full xl:w-1/2">
                <ReportSection />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
