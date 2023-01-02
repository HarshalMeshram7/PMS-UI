import { getCookie, setCookie, deleteCookie } from "cookies-next";
const EXPIRY_TIME = 86400;
const useStorage = () => {
  const token = getCookie("token");
  const userID = getCookie("user_id");
  const role = getCookie("role");
  const email = getCookie("email");
  const fname = getCookie("fname");
  const lname = getCookie("lname");
  const userProfile = getCookie("userProfile");
  const loggedInUserName = getCookie("userName");

  const fedFilter = getCookie("fed");
  const academyFilter = getCookie("academy");
  const clubFilter = getCookie("club");
  const clubTeamFilter = getCookie("clubTeam")

  const setFedFilter = (FedIDs) => {
    setCookie("fed", FedIDs);
  };
  const setAcademyFilter = (academyIDs) => {
    setCookie("academy", academyIDs);
  };
  const setClubFilter = (clubIds) => {
    setCookie("club", clubIds);
  };
  const setClubTeamFilter = (clubTeamIDs) => {
    setCookie("clubTeam", clubTeamIDs);
  };

  const setToken = (token) => {
    setCookie("token", token);
  };

  const setLoggedInUserName = (userName) => {
    setCookie("userName", userName);
  };
  const setUserId = (id) => {
    setCookie("user_id", id);
  };
  const setRole = (r) => {
    setCookie("role", r);
  };

  const setEmail = (email) => {
    setCookie("email", email);
  };
  const setFname = (fname) => {
    setCookie("fname", fname);
  };
  const setLname = (lname) => {
    setCookie("lname", lname);
  };
  const setUserProfile = (userProfile) => {
    setCookie("userProfile", userProfile);
  };

  const removeToken = () => {
    deleteCookie("token");
  };

  const clearAll = () => {
    deleteCookie("token");
    deleteCookie("email");
    deleteCookie("fname");
    deleteCookie("lname");
    deleteCookie("userProfile");
    deleteCookie("user_id");
    deleteCookie("role");
    deleteCookie("userName");
    deleteCookie("fed");
    deleteCookie("academy");
    deleteCookie("club");
    deleteCookie("clubTeam");
  };

  return {
    token,
    userID,
    email,
    fname,
    lname,
    userProfile,
    loggedInUserName,
    role,
    fedFilter,
    academyFilter,
    clubFilter,
    clubTeamFilter,
    setFedFilter,
    setAcademyFilter,
    setClubFilter,
    setClubTeamFilter,
    setUserId,
    setEmail,
    setToken,
    setRole,
    setFname,
    setLname,
    setUserProfile,
    setLoggedInUserName,
    removeToken,
    clearAll,
  };
};

export default useStorage;
