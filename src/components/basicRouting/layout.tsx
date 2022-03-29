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
import StyleInfo from "../style/styleInfo";
import HandleSample from "../style/handleSample";
import Fitting from "../style/fitting";
import MmntList from "../style/mmntlist";

export default function Layout() {
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
                        <StyleHomePage/>
                    </RequireAuth>}>
                <Route path=":styleId/info" element={<StyleInfo />} />
                <Route path=":styleId/mmntlist" element={<MmntList />} />
                <Route path=":styleId/fitting" element={<Fitting />} />
                <Route path=":styleId/handlesample" element={<HandleSample />} />
                <Route path="*" element={<ProtectedNotFoundPage />} />
            </Route>
        </Routes>
    )
}