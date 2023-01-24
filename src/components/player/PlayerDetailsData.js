import { useState } from "react";
import { getPlayerByID } from "src/services/playersRequest";


export const initialValues = async (ID) => {
  try {
    let data = await getPlayerByID(ID)
   console.log(data)
    let initialValues = {
      // Personal Information
      ID: ID,
      PersonalFirstName: data?.PersonalInfo[0]?.FirstName || "Enter Name",
      PersonalLastName: data?.PersonalInfo[0]?.LastName ||"Enter Last Name",
      PersonalGender: data?.PersonalInfo[0]?.Gender || "Male",
      PersonalDateOfBirth: data?.PersonalInfo[0]?.DateOfBirth ||"1990-01-01",
      PersonalPhone: data?.PersonalInfo[0]?.ContactNo ||"9876543210",
      PersonalEmail: data?.PersonalInfo[0]?.Email || "a@gmail.com",
      PersonalPassword: data?.PersonalInfo[0]?.Password || "Password",
      PersonalRecoveryEMail: data?.PersonalInfo[0]?.RecoveryEMail ||"a@gmail.com",
      PersonalTypeOfPlayerID: data?.PersonalInfo[0]?.PlayersTypeID ||1,
      PersonalEducationQualification: data?.PersonalInfo[0]?.EducationQualification ||"EducationQualification",
      Personaledudocuments: data?.PersonalInfo[0]?.HighestEduDocument ||"edudocuments",
      Personalphoto: data?.PersonalInfo[0]?.Photo || "photo",
      PersonalBasePrice: data?.PersonalInfo[0]?.BasePrice || "5555",
      PersonalPlayingPosition: data?.PersonalInfo[0]?.PlayingPosition || "req.body.PlayingPosition",
      PersonalTMSITMSApplicable: data?.PersonalInfo[0]?.TMS_ITMS || 1,
      Personaldocuments: data?.PersonalInfo[0]?.TMSdocument || "req.body.documents",
      PersonalLongDescription: data?.PersonalInfo[0]?.LongDescription || "req.body.LongDescription",
      PersonalFacebook: data?.PersonalInfo[0]?.Facebook || "req.body.dgfgfgf",
      PersonalTwitter: data?.PersonalInfo[0]?.Twitter || "req.body.Twitter",
      PersonalLinkedIn: data?.PersonalInfo[0]?.Linkedin || "req.body.Linkedin",
      // Address
      Address1: data?.Address?.Address1 || "Address1",
      Address2: data?.Address?.Address2 || "Address2",
      City: data?.Address?.City || "Nagpur",
      Country: data?.Address?.Country || "India",
      Nationality: data?.Address?.Nationality || "Nationality",
      ZipCode: data?.Address?.ZipCode || "ZipCode",
      IsLocal: data?.Address?.IsLocal || "0",
      // Player AcademyClub
      playersacademyclub: {
        AcademyID: [0, 49],
        ClubID: [],
      },
      // Document
      DocumentTypeID: data?.Document?.DocumentTypeID || "1",
      DocumentStatusID: data?.Document?.StatusID || "1",
      DocumentFilePath: data?.Document?.FilePath || "documents.pdf",
      Document: {
        DocumentTypeID: "1",
        StatusID: "1",
        FilePath: "documents.pdf",
      },
      // Parents Information
      familyinfoName: data?.familyinfo?.Name || "Family name ok",
      familyinfoCity: data?.familyinfo?.City || "Family City ok",
      familyinfoCountry: data?.familyinfo?.Country || "Family country ok",
      familyinfoJobTelNo: data?.familyinfo?.JobTelNo || "",
      familyinfoHomeTelNo: data?.familyinfo?.HomeTelNo || "",
      familyinfoMobileNo: data?.familyinfo?.MobileNo || "78888",
      familyinfoEmail: data?.familyinfo?.Email || "Family mail ok",
      familyinfoFamilyMember: data?.familyinfo?.FamilyMember || "",
      // TMS_ITMS
      TMS_ITMSTransferdClubID: data?.TMS_ITMS?.ID || 1,
      TMS_ITMSTransferredToWhichClub: data?.TMS_ITMS?.TransferdClubID || "to india 11",
      TMS_ITMSTransferFromDate: data?.TMS_ITMS?.TransferFromDate || "2021-06-13",
      TMS_ITMSTransferToDate: data?.TMS_ITMS?.TransferToDate || "2022-06-14",
      TMS_ITMSMOUDocument: data?.TMS_ITMS?.MOUDocument || "mou",
      TMS_ITMSAgreementDocument: data?.TMS_ITMS?.AgreementDocument || "agree",
      TMS_ITMSOtherDocuments: data?.TMS_ITMS?.OtherDocuments || "other",
      TMS_ITMSPaymentDetails: "field not in db",      // not in data base table
      // Fitness
      FitnessPhysicalFitnessInfo: data?.Fitness?.PhysicalFitness || "physical ok",
      FitnessLaboratoryInfo: data?.Fitness?.LabInfo || "labinfo ok",
      FitnessPastMedication: data?.Fitness?.PastMedication || "no past med ok",
      FitnessCurrentMedication: "field not in db",  // not in data base table
      FitnessPlayersInjuryID: data?.Fitness?.PlayersInjuryID || 1,
      FitnessDietPlan: data?.Fitness?.DietPlan || 1,
      FitnessTestDetails: "field not in db",    // not in data base table
      FitnessTestConductedDate: "2021-06-13",    // not in data base table
      FitnessTestResult: "field not in db",   // not in data base table
      // Training Module
      TrainingShortTerm: "field not in db",  // not in data base table
      TrainingLongTerm: "field not in db",   // not in data base table
      TrainingSpecial: "field not in db",    // not in data base table
      //Training Management
      ManagementPlan: "field not in db",    // not in data base table
      ManagementGoalSetting: "field not in db",   // not in data base table
      //Profile
      //Player Statistic
      StaticMatchesPlayed: "field not in db",     // not in data base table
      StaticPointScore: "field not in db",      // not in data base table
      StaticPenaltyScore: "field not in db",      // not in data base table
      StaticVoilations: "field not in db",      // not in data base table
      StaticDisqualification: "field not in db",      // not in data base table
      //Evaluation
      //Communication
      CommunicationCoaches: "field not in db",      // not in data base table
      CommunicationTeamMember: "field not in db",     // not in data base table
      CommunicationGroupMessaging: "field not in db",     // not in data base table
      CommunicationLiveChat: "field not in db",     // not in data base table
      CommunicationNotificationRemainder: "field not in db",      // not in data base table
    }
    return initialValues
  } catch (err) { console.log(err) }
};

export const DataModel = (data) => {
  console.log(data)
  return new Promise(function (resolve, reject) {
    let DataModel =
    {
      "ID": data.ID,
      "FirstName": data.PersonalFirstName,
      "LastName": data.PersonalLastName,
      "Gender": data.PersonalGender,
      "DateOfBirth": data.PersonalDateOfBirth,
      "Phone": data.PersonalPhone,
      "Email": data.PersonalEmail,
      "Password": data.PersonalPassword,
      "RecoveryEMail": data.PersonalRecoveryEMail,
      "TypeOfPlayerID": data.PersonalTypeOfPlayerID,
      "EducationQualification": data.PersonalEducationQualification,
      "edudocuments": data.Personaledudocuments,
      "photo": data.Personalphoto,
      "BasePrice": data.PersonalBasePrice,
      "PlayingPosition": data.PersonalPlayingPosition,
      "TMSITMSApplicable": data.PersonalTMSITMSApplicable,
      "documents": data.Personaldocuments,
      "LongDescription": data.PersonalLongDescription,
      "Facebook": data.PersonalFacebook,
      "Twitter": data.PersonalTwitter,
      "Linkedin": data.PersonalLinkedIn,

      "playersacademyclub": {
        "AcademyID": [0, 49],
        "ClubID": []
      },

      "Address":
      {
        "Address1": data.Address1,
        "Address2": data.Address2,
        "City": data.City,
        "Country": data.Country,
        "Nationality": data.Nationality,
        "ZipCode": data.ZipCode,
        "IsLocal": data.IsLocal,
      },

      "Document":
      {
        "DocumentTypeID": "1",
        "StatusID": "1",
        "FilePath": "documents.pdf"
      },

      "familyinfo":
      {
        "Name": data.familyinfoName,
        "City": data.familyinfoCity,
        "Country": data.familyinfoCountry,
        "JobTelNo": data.familyinfoJobTelNo,
        "HomeTelNo": data.familyinfoHomeTelNo,
        "MobileNo": data.familyinfoMobileNo,
        "Email": data.familyinfoEmail,
        "FamilyMember": data.familyinfoFamilyMember,
      },

      "TMS_ITMS":
      {
        "TransferdClubID": data.TMS_ITMSTransferdClubID,
        "TransferFromDate": data.TMS_ITMSTransferFromDate,
        "TransferToDate": data.TMS_ITMSTransferToDate,
        "MOUDocument": data.TMS_ITMSMOUDocument,
        "AgreementDocument": data.TMS_ITMSAgreementDocument,
        "OtherDocuments": data.TMS_ITMSOtherDocuments,
      },

      "Fitness":
      {
        "PhysicalFitness": data.FitnessPhysicalFitnessInfo,
        "LabInfo": data.FitnessLaboratoryInfo,
        "PastMedication": data.FitnessPastMedication,
        "DietPlan": data.FitnessDietPlan,
        "PlayersInjuryID": data.FitnessPlayersInjuryID,
      },
    }
    resolve(DataModel)
  })


}


