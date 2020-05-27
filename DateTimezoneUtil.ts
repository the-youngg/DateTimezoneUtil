import moment from "moment-timezone";

export class DateTimezoneUtil {

    static DateFormat = "YYYY年MM月DD日";
    static DateTimeFormat = "YYYY年MM月DD日 HH:mm:ss";

    // 获取本地时区
    static LocalTimezone = moment.tz.guess();

    /**
     * 将UTC时间转换成本地时区时间，并格式化
     * 如果要转换成其他时区的时间，修改下方的<this.LocalTimezone>为要转化的时区即可
     *
     * @param utcTime UTC时间 例：2020-05-26T00:00:00Z
     * @param outputFormat 输出的格式    例：YYYY年MM月DD日 HH:mm:ss
     * @return 格式化后的本地时区时间    例：2020年5月26日 09:00:00
     */
    public static formatUTCDateTime(utcTime: string, outputFormat: string): string {
        return moment(utcTime).tz(this.LocalTimezone).format(outputFormat);
    }

    /**
     * 将时间戳转成UTC
     *
     * @param inputTimestamp 时间戳（秒  例：1590422400
     * @return 时间戳对应的UTC时间  例：2020-05-26T00:00:00Z
     */
    public static formatTimestampToUTC(inputTimestamp: number): string {
        return moment.unix(inputTimestamp).utc().format();
    }
    
    /**
     * 将时间转成UTC
     *
     * @param inputTime 输入的时间   例：2020-05-26 09:00:00
     * @param inputFormat 输入的时间的格式  例：yyyy-MM-DD HH:mm:ss
     * @param inputTimezone 输入的时间所在的时区  例：Asia/Tokyo
     * @return 输入的时间对应的UTC时间    例：2020-05-26T00:00:00Z
     */
    public static formatDateToUTC(inputTime: string, inputFormat: string, inputTimezone: string): string {
        return moment.tz(inputTime, inputFormat, inputTimezone).utc().format();
    }

    /**
     * 将时间戳转成本地时区时间
     *
     * @param inputTimestamp 时间戳（秒）例：1590422400
     * @param outputFormat 输出的时间格式，不传该参数则默认值为：YYYY年MM月DD日 HH:mm:ss
     * @return 格式化后的本地时区时间  例：2020年05月26日 08:00:00
     */
    public static formatTimestampToLocal(inputTimestamp: number, outputFormat: string = this.DateTimeFormat): string {
        const utcTime = this.formatTimestampToUTC(inputTimestamp);
        return this.formatUTCDateTime(utcTime, outputFormat);
    }
    
    /**
     * 将时间转成本地时区时间
     * <ul>
     * <li> 案例1："2020-05-26T16:36:36+08:00"，"YYYY-MM-DDTHH:mm:ssZ"<br/>
     * <li> 案例2："05月26日2020年 09:00:00"，"MM月DD日YYYY年 HH:mm:ss",<br/>
     * <li> 案例3："26.05.2020 09:00:00"，"DD.MM.yyyy HH:mm:ss",<br/>
     * <li> 案例4："26/05/2020 09:00:00"，"DD/MM/yyyy HH:mm:ss",<br/>
     * <li> 案例5："2020-05-26 09:00:00"，"yyyy-MM-DD HH:mm:ss",<br/>
     * <li> 案例6：如果是"Tue May 26 2020 16:41:54 GMT+0800"这种，
     *       将其 moment(Tue May 26 2020 16:41:54 GMT+0800).format(),
     *       得到"2019-07-23T20:40:06+08:00"，然后按照[案例1]处理
     * </ul>
     *
     * @param inputTime 输入的时间   例：2020-05-26 09:00:00
     * @param inputFormat 输入的时间的格式  例：yyyy-MM-DD HH:mm:ss
     * @param inputTimezone 输入的时间所在的时区，如果输入的时间格式中带有Z，则此参数的改变不会影响结果  例：Asia/Tokyo
     * @param outputFormat 输出的时间格式，不传该参数则默认值为：YYYY年MM月DD日 HH:mm:ss
     * @return 格式化后的本地时区时间  例：2020年05月26日 08:00:00
     *
     */
    public static formatDateToLocal(inputTime: string, inputFormat: string, inputTimezone: string, outputFormat: string = this.DateTimeFormat): string {
        const utcTime = this.formatDateToUTC(inputTime, inputFormat, inputTimezone);
        return this.formatUTCDateTime(utcTime, outputFormat);
    }
    

}
