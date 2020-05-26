import moment from "moment-timezone";

export class DateTimezoneUtil {

    static DateFormat = "YYYY年MM月DD日";
    static DateTimeFormat = "YYYY年MM月DD日 HH:mm:ss";

    // 获取本地时区
    static LocalTimezone = moment.tz.guess();

    /**
     * 格式化时间
     *
     * @param inputTime 输入的时间   例：2020-05-26 10:38:00
     * @param outputFormat 输出的格式    例：YYYY年MM月DD日 HH:mm:ss
     * @return 输出时间对应的格式    例：2020年5月26日 10:38:00
     */
    public static formatDateTime(inputTime: string, outputFormat: string) {
        return moment(inputTime).format(outputFormat);
    }

    /**
     * 将时间转成UTC
     *
     * @param inputTime 输入的时间   例：2020-05-26 10:38:00
     * @param inputFormat 输入的时间的格式  例：yyyy-MM-DD HH:mm:ss
     * @param inputTimezone 输入的时间所在的时区  例：Asia/Tokyo
     * @return 输入的时间对应的UTC时间    例：2020-05-26T01:38:00Z
     */
    public static formatDateToUTC(inputTime: string, inputFormat: string, inputTimezone: string) {
        return moment.tz(inputTime, inputFormat, inputTimezone).utc().format();
    }

    /**
     * 将时间转成本地时区时间
     *
     * @param inputTime 输入的时间   例：2020-05-26 10:38:00
     * @param inputFormat 输入的时间的格式  例：yyyy-MM-DD HH:mm:ss
     * @param inputTimezone 输入的时间所在的时区  例：Asia/Tokyo
     * @param outputFormat 输出的时间格式  例：YYYY年MM月DD日 HH:mm:ss
     * @return 格式化后的本地时区时间  例：2020年05月26日 09:38:00
     *
     */
    public static formatDateToLocal(inputTime: string, inputFormat: string, inputTimezone: string, outputFormat: string) {
        const utcTime = this.formatDateToUTC(inputTime, inputFormat, inputTimezone);
        return this.formatDateTime(moment(utcTime).tz(this.LocalTimezone).format(), outputFormat);
    }


}
