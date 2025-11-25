import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import colorSharp from "../assets/img/color-sharp.png";
import { motion, useInView } from "framer-motion";

const useCountUp = (isVisible, targetValue, duration = 1.5) => {
  const [circleValue, setCircleValue] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);
  const requestRef = useRef();
  const startTimeRef = useRef();

  const animate = useCallback(
    (currentTime) => {
      if (startTimeRef.current === undefined) {
        startTimeRef.current = currentTime;
      }
      const elapsed = currentTime - startTimeRef.current;
      const totalDuration = duration * 1000;

      const circleDuration = totalDuration * 0.7;
      const circleProgress = Math.min(elapsed / circleDuration, 1);
      const currentCircleValue = circleProgress * targetValue;
      setCircleValue(currentCircleValue);

      if (elapsed >= circleDuration) {
        const numberElapsed = elapsed - circleDuration;
        const numberDuration = totalDuration * 0.3; // Remaining 30% for numbers
        const numberProgress = Math.min(numberElapsed / numberDuration, 1);
        const currentDisplayValue = Math.floor(numberProgress * targetValue);
        setDisplayValue(currentDisplayValue);
      } else {
        setDisplayValue(0);
      }

      if (elapsed < totalDuration) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setCircleValue(targetValue);
        setDisplayValue(targetValue);
      }
    },
    [duration, targetValue]
  );

  useEffect(() => {
    if (isVisible) {
      const now = performance.now();
      const totalDuration = duration * 1000;
      const circleDuration = totalDuration * 0.7;

      const initialCircleProgress = 0.05;
      const initialCircleValue = initialCircleProgress * targetValue;
      setCircleValue(initialCircleValue);
      setDisplayValue(0);

      const offsetMs = initialCircleProgress * circleDuration;
      startTimeRef.current = now - offsetMs;

      animate(now);

      requestRef.current = requestAnimationFrame(animate);

      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
        startTimeRef.current = undefined;
      };
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      setCircleValue(0);
      setDisplayValue(0);
      startTimeRef.current = undefined;
    }
  }, [isVisible, animate, duration, targetValue]);

  return { circleValue, displayValue };
};

const SkillItem = ({ skill, index, getGradient, triggerAnimation }) => {
  const [start, end] = getGradient(skill.percentage);
  const { circleValue, displayValue } = useCountUp(
    triggerAnimation,
    skill.percentage,
    1.5
  );

  return (
    <motion.div
      className="skill-item"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="progress-wrapper">
        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient
              id={`gradient-${index}`}
              gradientTransform="rotate(90)"
            >
              <stop offset="0%" stopColor={start} />
              <stop offset="100%" stopColor={end} />
            </linearGradient>
          </defs>
        </svg>

        <CircularProgressbarWithChildren
          value={circleValue}
          styles={buildStyles({
            pathColor: `url(#gradient-${index})`,
            trailColor: "rgba(255,255,255,0.1)",
          })}
        >
          <div
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            {displayValue}%
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <h5>{skill.name}</h5>
    </motion.div>
  );
};

export const Skills = () => {
  const skills = useMemo(
    () => [
      { name: "HTML/CSS", percentage: 95 },
      { name: "React", percentage: 80 },
      { name: "JavaScript", percentage: 70 },
      { name: "Python", percentage: 90 },
      { name: "SQL", percentage: 60 },
    ],
    []
  );

  const getGradient = useCallback((percentage) => {
    if (percentage >= 85) return ["#00c853", "#95ee5dff"];
    else if (percentage >= 50) return ["#ffb300", "#ff6f00"];
    else return ["#ff5252", "#ac0303ff"];
  }, []);

  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, {
    once: false, // allow repeat
    margin: "-200px",
  });

  return (
    <section className="skill" id="skills" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="skill-bx"
          initial={{ opacity: 0, y: 40 }}
          animate={
            sectionInView ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 40 }
          }
          transition={{ duration: 0.8 }}
        >
          <h2>Skills</h2>
          <p></p>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <SkillItem
                key={skill.name}
                skill={skill}
                index={index}
                getGradient={getGradient}
                triggerAnimation={sectionInView}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <img
        className="background-image-left"
        src={colorSharp}
        alt="background"
      />
    </section>
  );
};
