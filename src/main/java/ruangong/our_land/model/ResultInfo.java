package ruangong.our_land.model;

import lombok.Data;

/**
 * @Author: Lsutin
 * @Date: 2021/11/1 11:25
 * @describe:
 */
@Data
public class ResultInfo {
    int status;
    String message;
    Object data;

   public ResultInfo(int status,String message){
       this.status=status;
       this.message=message;
   }

    public ResultInfo(int status,Object data){
        this.status=status;
        this.data=data;
    }

    public static ResultInfo success(Object data){
        return new ResultInfo(200, data);
    }
    public static ResultInfo success(int status,Object data){
        return new ResultInfo(status, data);
    }

    public static ResultInfo error(String message){
        return new ResultInfo(400, message);
    }
    public static ResultInfo error(Object data){
        return new ResultInfo(400, data);
    }
    public static ResultInfo error(int status,String message){
        return new ResultInfo(status, message);
    }
    public static ResultInfo error(int status,Object data){
        return new ResultInfo(status, data);
    }
}
