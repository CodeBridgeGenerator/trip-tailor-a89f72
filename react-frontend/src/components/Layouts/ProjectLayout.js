import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import ItinerariesPage from "../ItinerariesPage/ItinerariesPage";
import DayPlansPage from "../DayPlansPage/DayPlansPage";
import ActivitiesPage from "../ActivitiesPage/ActivitiesPage";
import InterestsPage from "../InterestsPage/InterestsPage";
import UserInterestsPage from "../UserInterestsPage/UserInterestsPage";
import BookmarksPage from "../BookmarksPage/BookmarksPage";
import ItineraryCitiesPage from "../ItineraryCitiesPage/ItineraryCitiesPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "itineraries":
                return <ItinerariesPage />;
case "dayPlans":
                return <DayPlansPage />;
case "activities":
                return <ActivitiesPage />;
case "interests":
                return <InterestsPage />;
case "userInterests":
                return <UserInterestsPage />;
case "bookmarks":
                return <BookmarksPage />;
case "itineraryCities":
                return <ItineraryCitiesPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
