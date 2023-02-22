import { AddSurveyRepository } from "../../../../data/protocols/db/survey/add-survey-repository"
import { LoadSurveysRepository } from "../../../../data/protocols/db/survey/load-surveys-repository";
import { SurveyModel } from "../../../../domain/model/survey";
import { AddSurveyModel } from "../../../../domain/use-cases/add-survey";
import { MongoHelper } from "../helpers/mongo-helper";

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
    async add(surveyData: AddSurveyModel): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.insertOne(surveyData)
    }
    async loadAll(): Promise<SurveyModel[]> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        const surveysDbList = await surveyCollection.find().toArray()
        const surveys:SurveyModel[] = surveysDbList.map(survey => ({
            id: survey._id.toString(),
            question: survey.question,
            answers: survey.answers,
            date: survey.date
        }))
        return surveys
    }
}