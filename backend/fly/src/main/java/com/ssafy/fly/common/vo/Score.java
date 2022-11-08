package com.ssafy.fly.common.vo;

import lombok.Getter;

@Getter
public class Score {
    private String color;
    private Double score;

    public Score(String color, Double score) {
        this.color = color;
        this.score = score;
    }
}
