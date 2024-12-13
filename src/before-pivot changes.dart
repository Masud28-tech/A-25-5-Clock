useEffect(() => {
    setMinutes(session);
    setSeconds(0);
  }, [isReset]);

  useEffect(() => {
    setMinutes(session);
  }, [session]);

  useEffect(() => {
    if (minutes > 0 && isTimerRunning) {
      if (minutes === session) {
        // this will do the first time timer start
        setMinutes(session - 1);
      }
      const mintueTimerId = setTimeout(() => {
        setMinutes(minutes - 1);
      }, 60000);

      return () => clearTimeout(mintueTimerId);
    }
  }, [minutes, isTimerRunning]);

  useEffect(() => {
    if (isTimerRunning) {
      if (seconds > 0) {
        const secondsTimerId = setTimeout(() => {
          setSeconds(seconds - 1);
        }, 1000);

        return () => clearTimeout(secondsTimerId);
      } else {
        setSeconds(59);
      }
    }
  }, [seconds, isTimerRunning]);

  