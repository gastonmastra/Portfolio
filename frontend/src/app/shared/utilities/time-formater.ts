import moment from "moment";

export class TimeFormater {
    formatDate(date: Date): string {
        return moment(date).format("dd-MM-yyy");
    }
}

export class MonthYearFormater extends TimeFormater {
    public override formatDate(date: Date): string {
        return moment(date).format("MM-yyyy")
    }
}

export class LargeFormater extends TimeFormater {
    public override formatDate(date: Date): string {
        return moment(date).format("dd-MMMM-yyyy");
    }
}