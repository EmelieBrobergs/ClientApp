import { Route, Routes } from "react-router-dom";
import MyStylesPage from "../../pages/myStylesPage";
import HomePage from "../../pages/homePage";
import LoginPage from "../../pages/loginPage";
import ProfilePage from "../../pages/profilePage";
import ProtectedNotFoundPage from "../../pages/protectedNotFoundPage";
import StylesPage from "../../pages/stylesPage";
import TemplatesPage from "../../pages/templatesPage";
import RequireAuth from "./requierAuth";
import StyleHomePage from "../../pages/styleHomePage";
import LayoutHandleSample from "../style/layoutHandleSample";
import LayoutFitting from "../style/layoutFitting";
import LayoutMeasurements from "../style/measurements/layoutMeasurements";
import LayoutInfo from "../style/info/layoutInfo";
import { useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { setCurrentUserFromLoclstorageAsync } from '../../reduxSlices/userSlice';

export default function Layout() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // NOTE: hinner denna ladda???
        dispatch(setCurrentUserFromLoclstorageAsync());
    }, []);

    //TODO: Vill sätta cusrentUser baserat på lokalstorage

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={
                <RequireAuth>
                    <HomePage />
                </RequireAuth>
            }>
                <Route path="/mystyles" element={<MyStylesPage />} />
                <Route path="/styles" element={<StylesPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<ProtectedNotFoundPage />} />
            </Route>
            <Route path="/style" element={<RequireAuth>
                <StyleHomePage />
            </RequireAuth>}>
                <Route path=":styleId/info" element={<LayoutInfo />} />
                <Route path=":styleId/mmntlist" element={<LayoutMeasurements />} />
                <Route path=":styleId/fitting" element={<LayoutFitting />} />
                <Route path=":styleId/handlesample" element={<LayoutHandleSample />} />
                <Route path="*" element={<ProtectedNotFoundPage />} />
            </Route>
        </Routes>
    );
}