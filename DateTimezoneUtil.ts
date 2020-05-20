import {MomentInput} from "moment";
import moment from "moment-timezone";

export class DateTimezoneUtil {

    static DateFormat = "YYYY年MM月DD日";
    static DateTimeFormat = "YYYY年MM月DD日 HH:mm:ss";
    // 获取本地时区
    static LocalTimezone = moment.tz.guess();


    /**
     * 获取带有时区的时间
     *
     * @param timezone
     * @param input
     */
    private static formatDateWithTimezone(timezone: string, input: MomentInput) {
        return moment.tz(input, timezone);
    }

    /**
     * 将其他时区的时间转换为本地时区的时间
     *
     * @param inputTimezone 输入的时区   例：Asia/Tokyo
     * @param input 输入的时间   例：2020-05-20 18:00:00
     * @return  例：Asia/Shanghai: 2020年05月20日 17:00:00
     */
    public static formatDateToLocalTimezone(inputTimezone: string, input: MomentInput) {
        return this.LocalTimezone +
            ": " +
            this.formatDateWithTimezone(inputTimezone, input)
                .tz(this.LocalTimezone)
                .format(this.DateTimeFormat);
    }

}
