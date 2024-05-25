import { DurationHelper } from "../shared/utilities/duration-helper";
import { MonthYearFormater, TimeFormater } from "../shared/utilities/time-formater";

interface JobArguments {
    title: string, company: string, 
    beginDate: Date, endDate?: Date,
    description?: string
}

export class Job {
    timeFormater: TimeFormater;
    title: string;
    company: string;
    beginDate: Date;
    endDate?: Date;
    description?: string;
    constructor(job: JobArguments) {
        this.title = job.title;
        this.company = job.company;
        this.beginDate = job.beginDate;
        if (job.endDate) this.endDate = job.endDate;
        if (job.description) this.description = job.description;
        this.timeFormater = new MonthYearFormater();
    }

    get workingPeriod(): string {
        const formatedBegin = this.timeFormater.formatDate(this.beginDate);
        let formatedEnd: string = "NOW";

        let duration = DurationHelper.getDurationBetween(this.beginDate, new Date());
        if (this.endDate) {
            formatedEnd = this.timeFormater.formatDate(this.endDate);
            duration = DurationHelper.getDurationBetween(this.beginDate, this.endDate);
        }
        return `${formatedBegin} - ${formatedEnd} (${duration})`;
    }
}