<?php

namespace App\Http\Controllers;

use App\Models\Todo;

use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function list(Request $request){
        $todos = Todo::all();
        return $todos;
    }

    public function create(Request $request){
        $todo = new Todo();
        $todo->name = $request->name;
        $todo->completed = $request->completed;
        $todo->save();
        return $todo;
    }

    public function delete(Request $request){
        $todo = Todo::find($request->id);
        $todo->delete();
        return $todo;
    }

    public function update(Request $request){
        $todo = Todo::find($request->id);
        if(!is_null($request->name)){
            $todo->name = $request->name;
        }
        if(!is_null($request->completed)){
            $todo->completed = $request->completed;
        }
        $todo->save();
        return $todo;
    }
}


