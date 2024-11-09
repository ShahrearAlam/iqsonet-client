
import { useState } from "react";
import { useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

// Components
import AllNotifications from "./AllNotifications/AllNotifications";
import UnreadNotifications from "./UnreadNotifications/UnreadNotifications";

// icons
import { MdNotificationsNone, MdOutlineNotificationsOff } from "react-icons/md";

export default function NotificationTabs() {
    const [tabIndex, setTabIndex] = useState(0);
    const { theme } = useSelector(state => state.theme);
    return (
        <div>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className={`tabs border-b ${theme ? 'border-gray-700' : 'border-gray-300'}`}>
                    <Tab
                        className={`flex items-center gap-2  tab tab-bordered  ${tabIndex === 0 && "tab-active"}`}
                    >
                        <MdNotificationsNone className=" text-base " />
                        All
                    </Tab>
                    <Tab
                        className={`flex items-center gap-2  tab tab-bordered   ${tabIndex === 1 && "tab-active"}`}
                    >
                        <MdOutlineNotificationsOff className=" text-base" />
                        Unread
                    </Tab>
                </TabList>

                <div className=" pt-5">
                    <TabPanel>
                        <AllNotifications />
                    </TabPanel>

                    <TabPanel>
                        <UnreadNotifications />
                    </TabPanel>
                </div>
            </Tabs>
        </div >
    )
}
