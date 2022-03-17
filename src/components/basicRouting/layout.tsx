import { Route, Routes } from "react-router-dom";
import ActiveStylesPage from "../../pages/activeStylesPage";
import HomePage from "../../pages/homePage";
import LoginPage from "../../pages/loginPage";
import ProfilePage from "../../pages/profilePage";
import ProtectedNotFoundPage from "../../pages/protectedNotFoundPage";
import StylesPage from "../../pages/stylesPage";
import TemplatesPage from "../../pages/templatesPage";
import RequireAuth from "./requierAuth";

export default function Layout() {
    return(
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={
                    <RequireAuth>
                        <HomePage/>
                    </RequireAuth>
                }>
                    <Route path="/auth/activestyles" element={<ActiveStylesPage/>} />
                    <Route path="/auth/styles" element={<StylesPage/>} />
                    <Route path="/auth/templates" element={<TemplatesPage/>} />
                    <Route path="/auth/profile" element={<ProfilePage/>} />
                    <Route path="*" element={<ProtectedNotFoundPage />}/>
                </Route>
            </Routes>
    )
}