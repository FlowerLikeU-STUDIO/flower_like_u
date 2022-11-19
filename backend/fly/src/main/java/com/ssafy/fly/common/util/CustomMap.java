package com.ssafy.fly.common.util;

import java.util.*;

public class CustomMap {
    public static String[] color = {"F6B5C0","F15168","CFB4EF","F3C46A","BDDFF3","F6F4E3","FCE3E3"};
    public static Map<Integer, List<Integer>> mapNine = new HashMap<>();
    public static Map<Integer, List<Integer>> mapSeven = new HashMap<>();
    public static Map<Integer, List<Integer>> mapFive = new HashMap<>();
    public static Map<Integer, List<Integer>> mapThree = new HashMap<>();

    public static boolean[] isCheck = new boolean[4];

    public static Map<Integer, List<Integer>> ofMap(int size) {
        if (size == 3) return getArrThree();
        else if (size == 5) return getArrFive();
        else if (size == 7) return getArrSeven();
        return getArrNine();
    }

    private static Map<Integer,List<Integer>> getArrNine() {
        if (mapNine.isEmpty()) {
            mapNine.put(0,Arrays.asList(1,3,4));
            mapNine.put(1,Arrays.asList(0,2,4,5));
            mapNine.put(2,Arrays.asList(1,5,6));
            mapNine.put(3,Arrays.asList(0,4,7));
            mapNine.put(4,Arrays.asList(0,1,3,5,7,8));
            mapNine.put(5,Arrays.asList(1,2,4,6,7,8));
            mapNine.put(6,Arrays.asList(2,5,8));
            mapNine.put(7,Arrays.asList(3,4,5,8));
            mapNine.put(8,Arrays.asList(4,5,6,7));
        }
        return mapNine;
    }

    private static Map<Integer,List<Integer>> getArrSeven() {
        if (mapSeven.isEmpty()) {
            mapSeven.put(0,Arrays.asList(1,3));
            mapSeven.put(1,Arrays.asList(0,2,3,4));
            mapSeven.put(2,Arrays.asList(1,4));
            mapSeven.put(3,Arrays.asList(0,1,4));
            mapSeven.put(4,Arrays.asList(1,2,3));
            mapSeven.put(5,Arrays.asList(3,4));
            mapSeven.put(6,Arrays.asList(4,5));
        }
        return mapSeven;
    }

    private static Map<Integer, List<Integer>> getArrFive() {
        if (mapFive.isEmpty()) {
            mapFive.put(0,Arrays.asList(1,2,3));
            mapFive.put(1,Arrays.asList(0,3,4));
            mapFive.put(2,Arrays.asList(0,3));
            mapFive.put(3,Arrays.asList(0,1,2,4));
            mapFive.put(4,Arrays.asList(1,3));
        }
        return mapFive;
    }

    private static Map<Integer, List<Integer>> getArrThree() {
        if (mapThree.isEmpty()) {
            mapThree.put(0,Arrays.asList(1,2));
            mapThree.put(1,Arrays.asList(0,2));
            mapThree.put(2,Arrays.asList(0,1));
        }
        return mapThree;
    }
}