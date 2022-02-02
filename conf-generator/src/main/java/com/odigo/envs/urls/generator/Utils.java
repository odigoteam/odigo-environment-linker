package com.odigo.envs.urls.generator;

import java.util.Arrays;
import java.util.Objects;

/**
 * The type Utils.
 */
public class Utils {

    private static final int MAJOR_VERSION = 0;
    private static final int MINOR_VERSION = 1;
    private static final String HTTPS_SCHEMA = "https";
    private static final String HTTPS_SCHEMA_DOMAIN_SEPARATOR = "://";

    /**
     * Compare occ version integer.
     *
     * @param v1 the v 1
     * @param v2 the v 2
     *
     * @return the integer
     */
    public static Integer compareOccVersion(String v1, String v2) {
        Integer result = null;
        if(Objects.nonNull(v1) && Objects.nonNull(v2)) {
            Integer[] v1PartsStr = convertStringArrayToIntegerArray(v1.split("\\."));
            Integer[] v2PartsStr = convertStringArrayToIntegerArray(v2.split("\\."));

            if(v1PartsStr[MAJOR_VERSION] > v2PartsStr[MAJOR_VERSION]) {
                result = 1;
            } else if(v1PartsStr[MAJOR_VERSION] < v2PartsStr[MAJOR_VERSION]) {
                result = -1;
            } else { // Then major are equals, we test minor
                if(v1PartsStr[MINOR_VERSION].equals(v2PartsStr[MINOR_VERSION])) {
                    result = 0;
                } else if(v1PartsStr[MINOR_VERSION] > v2PartsStr[MINOR_VERSION]) {
                    result = 1;
                } else {
                    result = -1;
                }
            }
        }
        return result;
    }

    private static Integer[] convertStringArrayToIntegerArray(String[] strings) {
        String[] clearedArray = strings;
        if(clearedArray.length > 2) {
            clearedArray = Arrays.copyOfRange(strings, 0, 2);
        }
        Integer[] integers = new Integer[clearedArray.length];
        int i=0;
        for(String str:clearedArray){
            integers[i]=Integer.parseInt(str);//Exception in this line
            i++;
        }
        return integers;
    }

    /**
     * Build url string.
     *
     * @param parts the parts
     *
     * @return the string
     */
    public static String buildURL(String... parts) {
        StringBuilder sb = new StringBuilder();
        if(Objects.nonNull(parts) &&  parts.length > 0) {
            sb.append(HTTPS_SCHEMA).append(HTTPS_SCHEMA_DOMAIN_SEPARATOR);
            for(int i=0; i < parts.length; i++) {
                if(Objects.nonNull(parts[i]) && !parts[i].startsWith("/") && i != 0) {
                    sb.append("/");
                }
                sb.append(parts[i]);
            }
        }
        return sb.toString();
    }

    /**
     * Compute environment type.
     *
     * @param type the type
     * @param env the env
     *
     * @return the string
     */
    public static String computeType(final String type, final String env) {
        String toRet;
        switch(type) {
            case "QA":
            case "QUA":
                if(env.startsWith("INT")) {
                    toRet = "INT";
                } else {
                    toRet = "QA";
                }
                break;
            case "DEV":
                if(env.startsWith("INT")) {
                    toRet = "INT";
                } else if(env.startsWith("QUA") || env.startsWith("QA")) {
                    toRet = "QA";
                } else {
                    toRet = type;
                }
                break;
            default:
                toRet = type;
                break;
        }
        return toRet;
    }

    public static <T> T getOrDefault(T value, T defaultValue) {
        T toRet = defaultValue;
        if(Objects.nonNull(value)) {
            if(value instanceof String && !((String)value).isEmpty()) {
                toRet = value;
            } else {
                toRet = defaultValue;
            }
        }

        return toRet;
    }
}
