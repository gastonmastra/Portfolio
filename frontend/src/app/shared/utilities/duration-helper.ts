import moment from "moment"

export class DurationHelper {
    public static getDurationBetween(firstDate: Date, secondDate: Date): string {
        const firstDateWithMoment = moment(firstDate).clone();
        const secondDateWithMoment =moment(secondDate).clone();
        const duration = moment.duration(
            firstDateWithMoment.diff(secondDateWithMoment)
        );
        return duration.humanize();
    }
}