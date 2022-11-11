package com.ssafy.fly.service;

import com.ssafy.fly.common.vo.Score;
import com.ssafy.fly.database.mysql.repository.HarmonyScoreRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HarmonyServiceImpl implements HarmonyService {
    private final HarmonyScoreRepository harmonyScoreRepository;

    public HarmonyServiceImpl(HarmonyScoreRepository harmonyScoreRepository) {
        this.harmonyScoreRepository = harmonyScoreRepository;
    }

    public String getColor(String color) {
        Map<String[], Double> scoreMap = new HashMap<>();
        harmonyScoreRepository.findAll().forEach((harmonyScore -> {
            scoreMap.put(new String[] {harmonyScore.getColorOne(), harmonyScore.getColorTwo()}, harmonyScore.getScore());
        }));

        List<Score> candidate = new ArrayList<>();
        for (String[] key : scoreMap.keySet()) {
            if (key[0].equals(color) || key[1].equals(color)) {
                String colorTmp;
                if (key[0].equals(color)) colorTmp = key[1];
                else colorTmp = key[0];
                candidate.add(new Score(colorTmp,scoreMap.get(key)));
            }
        }
        candidate.sort(new Comparator<Score>() {
            @Override
            public int compare(Score o1, Score o2) {
                return (int) (o2.getScore() - o1.getScore());
            }
        });
        return candidate.get(0).getColor();
    }
}
